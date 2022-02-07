import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { HeaderComponent } from './header/header.component';
import { BlogInfoComponent } from './blog-list/blog-info/blog-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogComponent } from './posts/post.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    HeaderComponent,
    BlogInfoComponent,
    NotFoundComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
