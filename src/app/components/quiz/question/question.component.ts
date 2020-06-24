import { Component, OnInit, Output, Input, ɵChangeDetectorStatus } from '@angular/core';
import { QuizQuestion } from './QuizQuestion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css', '../quiz.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input() answer: string;
  @Output() question: QuizQuestion;
  totalQuestions: number;
  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  optionIndex: number;
  status: boolean = false;
  selectedIndex: number;  

  allQuestions: QuizQuestion[] = [
    {
      questionId: 1,
      questionText: 'What type of food are you craving?',
      options: [
        { optionValue: '1', optionText: 'Mexican' },
        { optionValue: '2', optionText: 'Italian' },
        { optionValue: '3', optionText: 'Greek' },
        { optionValue: '4', optionText: 'American' },
        { optionValue: '5', optionText: 'Asian' },
      ],
      selectedOption: '',
    },
    {
      questionId: 2,
      questionText: 'What mood describes you best right now?',
      options: [
        { optionValue: '1', optionText: 'Vacation mode' },
        { optionValue: '2', optionText: 'Sunday funday' },
        { optionValue: '3', optionText: 'Casual night out' },
        { optionValue: '4', optionText: 'Permanent Homebody' },
      ],
      selectedOption: '',
    },
    {
      questionId: 3,
      questionText: 'What type of cocktail drinker are you?',
      options: [
        { optionValue: '1', optionText: 'The Classic' },
        { optionValue: '2', optionText: 'The Explorer' },
        { optionValue: '3', optionText: 'The Tried and True' },
        { optionValue: '4', optionText: 'The Novice' },
      ],
      selectedOption: '',
    },
    {
      questionId: 4,
      questionText: 'What meal is this accompanying?',
      options: [
        { optionValue: '1', optionText: 'Brunch' },
        { optionValue: '2', optionText: 'Lunch' },
        { optionValue: '3', optionText: 'Dinner' },
        { optionValue: '4', optionText: 'Happy Hour' },
        {
          optionValue: '5',
          optionText: 'Nothing, the cocktail is the main event',
        },
      ],
      selectedOption: '',
    },
    {
      questionId: 5,
      questionText: 'What is your preferred liquor?',
      options: [
        { optionValue: '1', optionText: 'Vodka' },
        { optionValue: '2', optionText: 'Tequila' },
        { optionValue: '3', optionText: 'Gin' },
        { optionValue: '4', optionText: 'Whiskey' },
        { optionValue: '5', optionText: 'Rum' },
        { optionValue: '6', optionText: 'Bourbon' },
        { optionValue: '7', optionText: 'IDK, surprise me' },
      ],
      selectedOption: '',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.setQuestionID(+params.get('questionId')); // get the question ID and store it
      this.question = this.getQuestion;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.totalQuestions = this.allQuestions.length;
    this.currentQuestion = this.questionID;
  }

  changeStatus() {
    this.status = !this.status;
  }

  onSelect(index: number) {
     this.selectedIndex = index;
     this.changeStatus();
  }

  displayNextQuestion() {
    this.questionIndex = this.questionID++;
    this.currentQuestion === this.currentQuestion++
    this.selectedIndex = null;
    this.changeStatus();
    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
    } else {
      this.navigateToResults();
    }
  }

  navigateToNextQuestion(): void {
    this.router.navigate(['quiz/question', this.getQuestionID() + 1]);
    this.displayNextQuestion();
  }

  navigateToResults(): void {
    this.changeStatus();
    this.router.navigate(['quiz/results'], { state:
      {
        totalQuestions: this.totalQuestions,
        allQuestions: this.allQuestions
      }
    });
  }

  // METHODS
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return (this.questionID = id);
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  get getQuestion(): QuizQuestion {
    return this.allQuestions.filter(
      (question) => question.questionId === this.questionID
    )[0];
  }
}
