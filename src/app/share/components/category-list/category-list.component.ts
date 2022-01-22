import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(public categories: CategoriesService) { }

}
