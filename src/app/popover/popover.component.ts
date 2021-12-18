import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public authService: AuthService, 
    public router: Router,
    private popoverController: PopoverController) { }

  public logout (){
    this.authService.logout().subscribe(
      data =>{
        this.router.navigate(['login']),
        this.popoverController.dismiss()
      },
      err => {
        console.log(err);
        
      }
    )
  }

  ngOnInit() {}

}
