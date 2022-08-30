import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InfluencersService } from './influencers.service';

describe('InfluencersService', () => {
  let service: InfluencersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InfluencersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
