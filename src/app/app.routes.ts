import { Routes } from '@angular/router';
import { ListaTarefasComponent } from './components/lista-tarefas/lista-tarefas.component';
import { FormsTarefasComponent } from './components/forms-tarefas/forms-tarefas.component';

export const routes: Routes = [
    {path: '', component: ListaTarefasComponent},
    {path: 'forms-tarefas', component: FormsTarefasComponent},
    { path: 'editar/:id', component: FormsTarefasComponent }
];
