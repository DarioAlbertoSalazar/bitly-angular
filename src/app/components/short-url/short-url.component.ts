import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {}

  procesarUrl() {
    if (this.nombreUrl === '') {
      this.error('Por favor ingrese una URL');
      return;
    }

    this.urlProcesada = false;
    this.loading = true;

    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);
  }

  obtenerUrlShort() {
    this.shortUrlService.getUrlShort(this.nombreUrl).subscribe(
      (data) => {
        this.loading = false;
        this.urlProcesada = true;
        this.urlShort = data.link;
      },
      (error) => {
        this.loading = false;
        this.nombreUrl = '';
        if (error.error.description === 'The value provided is invalid.') {
          this.error('La URL ingresada es invalida');
        }
      }
    );
  }

  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;

    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }
}
