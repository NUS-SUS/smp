import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClassificationsService } from './classifications.service';

describe('ClassificationsService', () => {
  let service: ClassificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ClassificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
