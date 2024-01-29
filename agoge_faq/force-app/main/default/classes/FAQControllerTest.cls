@IsTest
public with sharing class FAQControllerTest {
    @TestSetup
	static void makeData(){
		List<FAQ__c> faqList =  new List<FAQ__c>{
			new FAQ__c(
				Question__c = 'Test Question 1',
				Answer__c = 'Test Answer 1'
			),
			new FAQ__c(
				Question__c = 'Test Question 2',
				Answer__c = 'Test Answer 2'
			),
			new FAQ__c(
				Question__c = 'Test Question 3',
				Answer__c = 'Test Answer 3'
			),
			new FAQ__c(
				Question__c = 'Test Question 4',
				Answer__c = 'Test Answer 4'
			),
			new FAQ__c(
				Question__c = 'Test Question 5',
				Answer__c = 'Test Answer 5'
			)
		};

		insert faqList;
	}

	@IsTest
	private static void getFAQsTest(){
		

		System.assertEquals(true ,FAQController.getFAQs().size() > 1);
	}
}