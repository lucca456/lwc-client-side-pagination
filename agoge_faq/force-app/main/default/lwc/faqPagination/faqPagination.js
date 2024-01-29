import { LightningElement, api} from 'lwc';

export default class FaqPagination extends LightningElement {
	faqsShown = 10;
	currentPage = 1;
	totalFAQs;
	totalPages = 0;

	get records(){
		return this.visibleFAQs;
	}

	@api
	set records(data){
		if(data){
			this.totalFAQs = data;
			this.visibleFAQs = data.slice(0, this.faqsShown);
			this.totalPages = Math.ceil(data.length/this.faqsShown);
			this.updateFAQs();
		}
	}

	get disablePrevious(){
		return this.currentPage <= 1;
	}

	get disableNext(){
		this.currentPage >= this.totalPages;
	}
	
	nextHandler(){
		if(this.currentPage < this.totalPages){
			this.currentPage = this.currentPage + 1;
			this.updateFAQs();
		}
	}

	previousHandler(){
		if(this.currentPage > 1){
			this.currentPage = this.currentPage - 1;
			this.updateFAQs();
		}
	}

	updateFAQs(){
		const start = (this.currentPage-1)*this.faqsShown;
		const end = this.faqsShown * this.currentPage;
		this.visibleFAQs = this.totalFAQs.slice(start, end);
		this.dispatchEvent(new CustomEvent('update',{
			detail:{
				records: this.visibleFAQs
			}
		}))
	}
}