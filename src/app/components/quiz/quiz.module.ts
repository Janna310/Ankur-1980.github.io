import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro/intro.component';
import { QuestionComponent } from './question/question.component';
import { ResultsComponent } from './results/results.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [
    QuizComponent,
    IntroComponent,
    QuestionComponent,
    ResultsComponent,
  ],
  imports: [CommonModule, QuizRoutingModule],
})
export class QuizModule {}
