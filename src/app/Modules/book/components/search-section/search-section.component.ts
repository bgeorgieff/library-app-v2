import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss'],
})
export class SearchSectionComponent {
  @Output() searchStr = new EventEmitter<string>();
  title = 'The Curious Readers';

  searchForm = this.formBuilder.group({
    searchText: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  get searchText(): FormControl {
    return this.searchForm.get('searchText') as FormControl;
  }

  onSearchSubmit() {
    this.searchStr.emit(this.searchText.value);
    this.changeTitle();
  }

  changeTitle() {
    this.title = 'Search results';
  }
}
