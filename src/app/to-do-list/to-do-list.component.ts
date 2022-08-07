import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  todoForm: FormGroup;
  items: Item[] = [
    { title: 'Groceries', description: 'Get groceries from bigbasket', done: true, edit: false, editTitle: '', editDescription: '' },
    { title: 'Pants', description: 'Check on dual crop farming', done: false, edit: false, editTitle: '', editDescription: '' },
    { title: 'Cleaning', description: 'Clean my room and terrace', done: false, edit: false, editTitle: '', editDescription: '' },
    { title: 'Friends', description: 'Hangout with friends and wish them friendship day', done: false, edit: false, editTitle: '', editDescription: '' },
  ];
  done: Item[] = [];
  constructor(private fb: FormBuilder) {
    const storage = window.localStorage;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      itemTitle: ['', Validators.required],
      itemDescription: ['', Validators.required],
    });
    this.items = JSON.parse(localStorage.getItem('items') || '{}');
    this.done = JSON.parse(localStorage.getItem('done') || '{}');
  }

  addItem(title: string, description: string, editTitle: string, editDescription: string) {
    this.items.unshift({
      title,
      description,
      done: false,
      edit: false,
      editTitle,
      editDescription
    });
    this.todoForm = this.fb.group({
      itemTitle: ['', Validators.required],
      itemDescription: ['', Validators.required],
    });
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));
  }
  updateItemStatus(i: any, item: any) {
    this.items.splice(i, 1);
    this.done.unshift(item)
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));

  }
  hideInputbox(event: any, i: any) {
    let inputbox = document.getElementsByClassName('itemTitle' + i) as HTMLCollectionOf<HTMLElement>;
    inputbox[0].style.display = 'none';
  }
  hideDesInputbox(event: any, i: any) {
    let inputbox = document.getElementsByClassName('itemDescription' + i) as HTMLCollectionOf<HTMLElement>;
    inputbox[0].style.display = 'none';
  }
  undoItemStatus(i: any, item: any) {
    this.done.splice(i, 1);
    this.items.unshift(item);
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));
  }

  deleteItem(item: any) {
    this.items.splice(item, 1);
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));
  }
  editItem(item: any) {
    this.items[item].edit = true;
    let titleInputbox = document.getElementsByClassName('itemTitle' + item) as HTMLCollectionOf<HTMLElement>;
    let desInputbox = document.getElementsByClassName('itemDescription' + item) as HTMLCollectionOf<HTMLElement>;
    console.log(titleInputbox[0], 'title0')
    if (titleInputbox[0] && desInputbox[0]) {
      titleInputbox[0].style.display = 'block';
      desInputbox[0].style.display = 'block';
    }
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));
  }

  deleteDoneItem(item: any) {
    this.done.splice(item, 1);
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const storage = window.localStorage;
    storage.setItem('items', JSON.stringify(this.items));
    storage.setItem('done', JSON.stringify(this.done));
  }
}
