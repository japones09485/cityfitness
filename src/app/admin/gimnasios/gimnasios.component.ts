import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Gimnasio, Paises, RespGimnasios, User } from 'src/app/interfaces/interfaces';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-gimnasios',
  templateUrl: './gimnasios.component.html',
  styleUrls: ['./gimnasios.component.css']
})
export class GimnasiosComponent implements OnInit {

  $: any;
  list: Gimnasio[] = [];
  frmGimnasio: UntypedFormGroup;
  gimnasio: Gimnasio;
  likesView = [];
  frmGuardar = new FormData();
  editer = false;
  pathIm = environment.pathImgs;
  ImgPaises = environment.pathImgsPaises;
  imgCountry: String;
  paisesList: Paises[] = [];
  paises: Paises[] = [];
  nombrePais: String;
  user: User;
  UserGim=0;

  constructor(
    public api: ApiRestService,
    private fb: UntypedFormBuilder,
    private acRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.user = JSON.parse(sessionStorage.getItem('user'));
    
    this.initForm();
    $('#frmGimnasio').on('hidden.bs.modal', (e) => {
      this.frmGimnasio.reset();
    });
   
    this.api.getPaisesList()
      .subscribe((res: any) => {
        this.paisesList = res.lista;
      });

    this.api.getPaises()
      .subscribe((res: any) => {
        this.paises = res.lista;
      });

      this.acRouter.params.subscribe(param => {
        this.UserGim = param.idUser;
        if(this.UserGim){
          this.listGimnasiosUser(this.UserGim);
        }else{
          this.listGimnasios();
        }
        
      });

  }

  cambioPais() {
    this.banderaPais(this.frmGimnasio.get('pais').value);
  }

  banderaPais(bandera: string) {
    let infopais = this.paises[bandera].flag;
    this.nombrePais = this.paises[bandera].nombre;
    const flagPais = this.pathIm + 'imagenes/paises/' + infopais;
    this.imgCountry = flagPais;
  }

  listGimnasios() {
    this.api.getAllGimnasios()
      .subscribe((res: RespGimnasios) => {
        this.list = res.lista;
      });
  }

  listGimnasiosUser(idUsu:number) {
   
    this.api.getAllGimnasios()
    .subscribe((res: RespGimnasios) => {
      
        this.list = res.lista.filter(gimnasio => gimnasio.fk_usuario_gim === idUsu);
      
    });
  }

  initForm() {
    this.frmGimnasio = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo_gimnasio: ['', Validators.required]
    });
  }

  crearGimnasio() {

    this.frmGuardar.append('data', JSON.stringify(this.frmGimnasio.value));
    this.frmGuardar.append('UserGim', JSON.stringify(this.UserGim));
    this.api.createGym(this.frmGuardar)
      .subscribe((data: any) => {
        this.list.unshift(data.data);
        this.frmGimnasio.reset();
        this.api.mensajeUser = 'Creado correctamente';
        this.api.mostrarMsj = true;
        $('#frmGimnasio').modal('hide');
      });
  }

  editarGym(gim: Gimnasio) {
    this.gimnasio = gim;
    this.editer = true;
  }

  agregarArchivo(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      // Agregar el archivo al formulario
      this.frmGuardar.append(`${numFile}`, inputFile.files[0]);
      
      // Obtener el label asociado y actualizar su texto
      const fileName = inputFile.files[0].name;
      const labelElement = document.getElementById(`labelFile${numFile}`);
      if (labelElement) {
        labelElement.textContent = fileName;
      }
    }
  }

  returnGym(gimnasio: Gimnasio) {
    const updateIt = this.list.find((gim: Gimnasio) => gim.gim_id === gimnasio.gim_id);
    const index = this.list.indexOf(updateIt);
    this.list[index] = gimnasio;
  }

  banderaGimnasio(bandera: string) {
    const country = this.paisesList.find(pais => pais.iso === bandera); 
    
    return this.ImgPaises+'/'+country.flag;
  }

  loadLikes(likes) {
    console.log(likes);
    this.likesView = likes;
  }

  DeleteGim(idGim:number){

    Swal.fire({
      title: "Desea eliminar este gimnasio?",
      html: `
      Tenga en cuenta que se eliminaran las sedes y clases creadas para este gimnasio.
      `,
      showDenyButton: true,
      confirmButtonText: "SI",
     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.DeleteGim(idGim,this.UserGim)
        .subscribe((data: any) => {
          this.list = data.lista;
          if (result.isConfirmed) {
            Swal.fire(data.mensaje, "", "success");
          } 
        });
      } 
    });

  }
}



