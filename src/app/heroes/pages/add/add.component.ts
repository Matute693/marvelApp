import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: []  
})
export class AddComponent implements OnInit {

  public data: string = '';

  public publisher: any[] = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]
  public heroes: Heroes = {
    superhero: '',
    alter_ego: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  constructor(
    private heroeService: HeroesService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) {
      return;
    }
    this.activedRoute.params
    .pipe( 
    switchMap( ({ id }) => this.heroeService.getHeroeById(id))
    )
    .subscribe( heroe => this.heroes = heroe)
  }


  save(): void {
    if(this.heroes.superhero.trim().length === 0 ) {
      return;
    }
    if(this.heroes.id) {
      //Updated hero
      this.heroeService.updatedHero(this.heroes).subscribe(resp => {
        console.log('Updateando',resp)
      })
    } else {
      //Create new hero
       this.openSnackBar('hero added successfully', 'Close');
      this.heroeService.addHero( this.heroes )
       .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id])
      })
    }
  }

  deletedHero() {
    const dialog =this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: this.heroes
    })

    dialog.afterClosed()
    .subscribe( (resp) => {
      if(resp) {
        this.heroeService.deletedHero(this.heroes.id!).subscribe( resp => {
          this.router.navigate(['/heroes']);
        })
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AddComponent, {
  //     width: '250px',
  //     data: {name: this.data},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
