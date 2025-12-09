import { Component, inject } from '@angular/core';
import { Tarefas, TarefasService } from '../../services/tarefas.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-forms-tarefas',
  imports: [FormsModule, RouterModule],
  templateUrl: './forms-tarefas.component.html',
  styleUrl: './forms-tarefas.component.css'
})
export class FormsTarefasComponent {
  private api = inject(TarefasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  titulo = '';
  descricao = '';
  concluida = false;
  prazo: any = null;

  erro = '';
  salvando = false;

  editandoId: string | null = null;

  ngOnInit() {
    this.editandoId = this.route.snapshot.paramMap.get('id');

    if (this.editandoId) {
      this.api.buscarPorId(this.editandoId).subscribe({
        next: t => {
          this.titulo = t.titulo;
          this.descricao = t.descricao;
          this.concluida = t.concluida;
          this.prazo = new Date(t.prazo).toISOString().substring(0, 10);
        },
        error: e => this.erro = e.message ?? 'Falha ao carregar tarefa'
      });
    }
  }

  salvar() {
    if (!this.titulo || !this.prazo) return;

    const dados = {
      titulo: this.titulo,
      descricao: this.descricao,
      concluida: this.concluida,
      prazo: this.prazo
    };

    this.salvando = true;

    if (this.editandoId) {
      this.api.atualizar(this.editandoId, dados).subscribe({
        next: _ => this.router.navigate(['/']),
        error: e => { this.erro = e.message ?? 'Falha ao atualizar'; this.salvando = false; }
      });
    } else {
      this.api.criar(dados).subscribe({
        next: _ => this.router.navigate(['/']),
        error: e => { this.erro = e.message ?? 'Falha ao criar'; this.salvando = false; }
      });
    }
  }
}
