import {Component} from '@angular/core';
import {DataItem} from "../../../api/models";
import {CurrenciesService} from "../../services/currencies.service";

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.sass']
})
export class CurrencySelectorComponent {
  public item: DataItem;
  constructor(public currencies: CurrenciesService) { }
}
