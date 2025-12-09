import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tarefas {

  _id?: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  prazo: Date;

}


@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private http = inject(HttpClient);
  private base = 'http://localhost:3000/tasks';

  listar(): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(this.base);
  }

  buscarPorId(id: string): Observable<Tarefas> {
    return this.http.get<Tarefas>(`${this.base}/${id}`);
  }

  criar(tarefa: Tarefas): Observable<Tarefas> {
    return this.http.post<Tarefas>(this.base, tarefa);
  }

  atualizar(id: string, tarefa: Partial<Tarefas>): Observable<Tarefas> {
    return this.http.patch<Tarefas>(`${this.base}/${id}`, tarefa);
  }

  excluir(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }

  constructor() { }
}
