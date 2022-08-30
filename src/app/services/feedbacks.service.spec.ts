import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FeedbacksService } from './feedbacks.service';

describe('FeedbacksService', () => {
  let service: FeedbacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(FeedbacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
