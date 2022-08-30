import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CampaignsService } from './campaigns.service';

describe('CampaignsService', () => {
  let service: CampaignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CampaignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
