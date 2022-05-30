import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroes;

  constructor(
    private activedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {
      this.activedRoute.params.pipe(
        switchMap( ({ id }) =>  this.heroeService.getHeroeById(id))
      ).subscribe( heroe => this.heroe = heroe); 
  }

  goBack(): void { 
    this.router.navigate(['/heroes/list'])
  }

}
