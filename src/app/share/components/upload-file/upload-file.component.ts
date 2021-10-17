import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiFileLike} from '@taiga-ui/kit';
import {Observable, SubscriptionLike, of} from 'rxjs';
import {map, share, startWith, switchMap, tap} from 'rxjs/operators';
import {readFile} from '../../../../utils/rx-file-reader';

class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {}
}

function convertRejected({file, reason}: RejectedFile): TuiFileLike {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    content: reason,
  };
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit, OnDestroy{
  @Output() uploadFile: EventEmitter<string> = new EventEmitter<string>();
  readonly control = new FormControl();
  private readSub: SubscriptionLike | undefined;

  @tuiPure
  get loading$(): Observable<any> {
    return this.requests$.pipe(
      map(file => (file instanceof File ? [file] : [])),
      startWith([])
    );
  }

  @tuiPure
  get rejected$(): Observable<any> {
    return this.requests$.pipe(
      map(file => (file instanceof RejectedFile ? [convertRejected(file)] : [])),
      tap(({length}) => {
        if (length) {
          this.control.setValue(null);
        }
      }),
      startWith([]),
    );
  }

  @tuiPure
  private get requests$(): Observable<RejectedFile | File | null> {
    return this.control.valueChanges.pipe(switchMap(() => of(null)), share());
  }

  ngOnInit(): void {
    this.readSub = this.requests$.pipe(
      switchMap(file => {
        if (file instanceof File) {
          return readFile(file);
        } else {
          return of();
        }
      }),
      tap(text => {
        this.uploadFile?.emit(text as unknown as string);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.readSub?.unsubscribe();
  }
  constructor() {
  }
}
