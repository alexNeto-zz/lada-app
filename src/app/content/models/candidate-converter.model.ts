import { ReverseCandidate } from '../interfaces/reverse-candidate';
import { Candidate } from './../interfaces/candidate';

export class CandidateConverter {

    constructor() {
    }

    candidateToReverseCandidate(candidate: Candidate): ReverseCandidate {
        return {
            location: {
                x: candidate.location.x,
                y: candidate.location.y
            },
            address: {
                City: candidate.attributes.City,
                Region: candidate.attributes.Region,
                CountryCode: candidate.attributes.Country,
                Address: candidate.address
            }
        };
    }

    reverseCandidateToCandidate(reverseCandidate: ReverseCandidate): Candidate {
        return {
            location: {
                x: reverseCandidate.location.x,
                y: reverseCandidate.location.y
            },
            attributes: {
                City: reverseCandidate.address.City,
                Region: reverseCandidate.address.Region,
                Country: reverseCandidate.address.CountryCode
            },
            address: reverseCandidate.address.Address,
        };
    }
}
