import { ReverseCandidate } from '../interfaces/reverse-candidate';
import { Candidate } from './../interfaces/candidate';

export class CandidateConverter {
    private candidate: Candidate;
    private reverseCandidate: ReverseCandidate;

    constructor() {
    }

    candidateToReverseCandidate(candidate: Candidate): ReverseCandidate {
        this.reverseCandidate.location.x = candidate.location.x;
        this.reverseCandidate.location.y = candidate.location.y;
        this.reverseCandidate.address.City = candidate.attributes.City;
        this.reverseCandidate.address.Region = candidate.attributes.Region;
        this.reverseCandidate.address.CountryCode = candidate.attributes.Country;
        this.reverseCandidate.address.Address = this.candidate.address;
        return this.reverseCandidate;
    }

    reverseCandidateToCandidate(reverseCandidate: ReverseCandidate): Candidate {
        this.candidate.location.x = reverseCandidate.location.x;
        this.candidate.location.y = reverseCandidate.location.y;
        this.candidate.attributes.City = reverseCandidate.address.City;
        this.candidate.attributes.Region = reverseCandidate.address.Region;
        this.candidate.attributes.Country = reverseCandidate.address.CountryCode;
        this.candidate.address = reverseCandidate.address.Address;
        return this.candidate;
    }
}