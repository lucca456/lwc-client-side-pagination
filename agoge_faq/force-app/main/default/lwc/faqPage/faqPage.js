import { LightningElement, track } from 'lwc';

import FAQTitle from '@salesforce/label/c.FAQ';
import NoFAQsLabel from '@salesforce/label/c.NoFAQsLabel';

import getFAQs from '@salesforce/apex/FAQController.getFAQs';

export default class FaqPage extends LightningElement {
    @track faqs = [];
    @track filteredFaqs = [];
    labelsList = { 
		FAQTitle,
		NoFAQsLabel 
	};
	visibleFAQs;
	isVisible = false;
    connectedCallback(){
		getFAQs()
            .then(result => {
                if (result.length >= 1) {
					this.isVisible = true;
                    this.faqs = result;
                    this.filteredFaqs = [...this.faqs];
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
		
    }

    handleSearch(event) {
		const searchTerm = event.target.value.toLowerCase();
		
		this.debounceSearch = setTimeout(() => {
            this.filteredFaqs = this.faqs.filter(faq => 
                faq.Question__c.toLowerCase().includes(searchTerm)
            );
            this.visibleFAQs = this.filteredFaqs.slice(0, 10);
            this.updateFAQsHandler();
        }, 1000);
    }

	updateFAQsHandler(event){
		this.visibleFAQs = [...event.detail.records];
	}
}