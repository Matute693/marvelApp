import { Component, Input } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-card-component',
  templateUrl: './heroe-card-component.component.html',
  styleUrls: ['./heroe-card-component.component.css']
})
export class HeroeCardComponent {

  @Input() heroe!: Heroes;


}
