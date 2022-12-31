import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
const Typewriter = require('t-writer.js');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('line1') typewriterElement: any;
  @ViewChild('line2') typewriterElement2: any;
  @ViewChild('line3') typewriterElement3: any;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const target1 = this.typewriterElement.nativeElement;
    const target2 = this.typewriterElement2.nativeElement;
    const target3 = this.typewriterElement3.nativeElement;

    const writer1 = new Typewriter(target1, {
      typeSpeed: 150,
      loop: true,
      typeColor: 'blue',
      animateCursor: false,
    });

    const writer2 = new Typewriter(target2, {
      typeSpeed: 150,
      typeColor: 'blue',
      animateCursor: false,
    });
    const writer3 = new Typewriter(target3, {
      typeSpeed: 100,
      typeColor: 'blue',
      animateCursor: false,
    });

    writer1
      .changeTypeColor('#4338ca')
      .type('Test')
      .removeCursor()
      .then(writer2.start.bind(writer2))
      .rest(3000)
      .addCursor()
      .clear()
      .changeTypeColor('#ef4444')
      .type('Attempt')
      .removeCursor()
      .then(writer2.start.bind(writer2))
      .rest(2500)
      .addCursor()
      .clear()
      .changeTypeColor('#f59e0b')
      .type('Be Ready for')
      .removeCursor()
      .then(writer2.start.bind(writer2))
      .rest(5300)
      .addCursor()
      .clear()
      .start();

    writer2
      .changeTypeColor('#4338ca')
      .type('Your')
      .removeCursor()
      .then(writer3.start.bind(writer3))
      .rest(2000)
      .addCursor()
      .clear()
      .removeCursor()
      .rest(1500)
      .addCursor()
      .changeTypeColor('#ef4444')
      .type('the')
      .removeCursor()
      .then(writer3.start.bind(writer3))
      .rest(1600)
      .addCursor()
      .clear()
      .removeCursor()
      .rest(2700)
      .addCursor()
      .changeTypeColor('#f59e0b')
      .type('Your')
      .removeCursor()
      .then(writer3.start.bind(writer3))
      .rest(3900)
      .addCursor()
      .clear()
      .removeCursor();

    writer3
      .changeTypeColor('#4338ca')
      .type('Knowledge')
      .rest(500)
      .clear()
      .removeCursor()
      .rest(2600)
      .addCursor()
      .changeTypeColor('#ef4444')
      .type('Quiz')
      .rest(500)
      .clear()
      .removeCursor()
      .rest(4000)
      .addCursor()
      .changeTypeColor('#f59e0b')
      .type('Upcoming Challenge!')
      .rest(500)
      .clear()
      .removeCursor();
  }

  goToSignIn() {
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}
