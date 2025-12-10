import { Component, inject } from '@angular/core';
import { Tarefas, TarefasService } from '../../services/tarefas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-lista-tarefas',
  imports: [CommonModule, FormsModule, DatePipe, RouterModule],
  templateUrl: './lista-tarefas.component.html',
  styleUrl: './lista-tarefas.component.css'
})
export class ListaTarefasComponent {

  private api = inject(TarefasService);

  tarefas: Tarefas[] = [];
  carregando = false;
  erro = '';

  modalAberto = false;
  idParaExcluir: string | null = null;

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.carregando = true;

    this.api.listar().subscribe({
      next: xs => {
        this.tarefas = xs;
        this.carregando = false;
      },
      error: e => {
        this.erro = e.message ?? 'Falha ao carregar';
        this.carregando = false;
      }
    });
  }

  alterarStatus(tarefa: Tarefas) {
    const novoStatus = !tarefa.concluida;

    this.api.atualizar(tarefa._id!, { concluida: novoStatus }).subscribe({
      next: () => {
        tarefa.concluida = novoStatus;
      },
      error: err => {
        console.error('Erro ao atualizar status', err);
      }
    });
  }

  excluir(id?: string){
    if(!id) return;
    this.api.excluir(id).subscribe({
      next: _ => this.carregar(),
      error: e => this.erro = e.message ?? 'Falha ao excluir'
    });
  }
}
