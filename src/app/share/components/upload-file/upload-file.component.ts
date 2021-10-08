import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiFileLike} from '@taiga-ui/kit';
import {Observable, of} from 'rxjs';
import {map, share, startWith, switchMap, tap} from 'rxjs/operators';

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
export class UploadFileComponent {
  readonly control = new FormControl();

  @tuiPure
  get loading$(): Observable<any> {
    return this.requests$.pipe(
      map(file => (file instanceof File ? [file] : [])),
      startWith([]),
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
    return this.control.valueChanges.pipe(
      tap(f => {
        console.log('f', f);
        const reader = new FileReader();
        reader.onload = this.handleFileRead;
        reader.readAsText(f);
      }),
      switchMap(() => of(null)),
      share(),
    );
  }

  private  handleFileRead = (event: any): void => {
    console.log(event?.target?.result);
  }
}
