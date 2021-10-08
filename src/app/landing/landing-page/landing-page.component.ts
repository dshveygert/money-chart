import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  // tab: {id: number, link: string, name: string};
  tabs: ReadonlyArray<{id: number, link: string, name: string}> = [
    {id: 0, link: 'chart/1money', name: '1Money'}
  ];

  trackBy = (i: number, item: any): number => item?.id ?? i;

  ngOnInit(): void {
  }

  constructor() { }

}
