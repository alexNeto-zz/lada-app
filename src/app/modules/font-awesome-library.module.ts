import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    exports: [
        FontAwesomeModule
    ],
    imports: [
        FontAwesomeModule
    ],
    providers: [
    ]
})
export class FontAwesomeLibraryModule {
    constructor(private library: FaIconLibrary) {
        this.library.addIcons(faSearch, faCompass, faThumbsDown, faThumbsUp);
    }
}
