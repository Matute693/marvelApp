import { Component, Input, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  
  term: string = '';
  @Input() heroes: Heroes[] = [];
  selectedHero: Heroes | undefined;
  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.heroesService.getSuggestion(this.term.trim()).subscribe(( heroe ) => this.heroes = heroe);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const heroe: Heroes = event.option.value;
    this.term = heroe.superhero;
    this.heroesService.getHeroeById(heroe.id!)
    .subscribe( heroe => this.selectedHero = heroe)
  }

}
