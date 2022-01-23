import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Item } from 'src/app/api/models';
import {CategoriesService} from "../../services/categories.service";
import {DataRecordService} from "../../services/data-record.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {
  public cat: Item = {} as Item;

  public value(item: Item): string {
    return item.name;
  }
  public valueClass(item: Item, i: number): string {
    return `tui-space_horizontal-2 tui-space_vertical-2 support-0${!item.active ? '0' : item.id <= 20 ? item.id : 21}`;
  }

  ngOnInit(): void {
  }

  constructor(public categories: CategoriesService, public data: DataRecordService) { }

}
