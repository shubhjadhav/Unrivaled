# Unrivaled

## Coding Practices

### Naming Conventions
* Variables and Functions name - names concatenated with underscore | Ex: big_mouse
* Struct/Class name - camel case | Ex: bigMouse
 
### Comments
* Every file should have indtroductory comments stating
  * Name
  * Description
  * Created Date
  * Author
 * Every function should have comments explaining the implementation
 
 ### Commits
 * Try to commit every day
 * Commit for every file that is completed
 * Commit for every implementatation of a method/function
 * Commit message should be meaningful - It should be able to answer: What you did to achieve what
 
 ### Format and Styles
 * Tabs should be of 4 spaces
 * Indentation should be followed every where
 * Font: San-serif
 * UI color scheme: Blue
 
 ### Project Flow
  1. Upload Resume
     * The user uploads the resume that he/she wants to compare it with the job descreption
     * In this version, we are accepting pdf file formats and the user is able to upload one resume for one score output
     * In future versions, we will add docx file as a file upload option and also the user will be able to upload multiple resumes to compare with the job descreption and 
       choose the one that matches the most
       
  2. Upload Job Descreption
     * The user uploads the job descreption that he/she wants to mathc with the resume uploaded
     * In this version, we are accepting pdf file formats
     * In future versions, we will add docx file as a file upload option
     
  3. Store data in Database
     * After the file is uploaded, it will be converted to base64 format, so that it is suitable to be stored in the database, and is stored in our respective collection.
     * Resumes will be stored in resume collection and job descreptions in the job descreption collection

  4. Files retrieved, processed, and scores are stored in the database
     * Corresponding files (resume and job descreption for the respective user) will be retrived from the database and get processed. Key words found in both files and 
       important features are then used to score the match of resume to the job descreption
     * Then, the score and other outputs (keywords, word count, etc.) are stored in the database

  5. Display results
     * Finally, the output result will be displayed to the user.

 ### How It Works
  1. Create a dictionary of both jd and resume and then create vectors of both resume and jd
     * We will retrive the base64 format of both the resume and the job description from our respective collection
     * We will convert them to a string that they will be suitalbe to work with
     * Store the frequency of each word after removing stop words that are not necessary
     * Then we create the vectors (Here I need Jahnavi's help to make it technical)
   
  2. Finding keywords in both jd and resume after removing stop words and unnecessary things
     * We used "languages" library to find keywords in our resume and job description
     
  3. Finding similarities between the two vectors
     * We used "GloVe" to create the vectors for both the resume and job description. GloVe is an unsupervised learning algorithm for obtaining vector representations for 
       words
     
  4. Create score based on the similarity
     * We used "cosine similarity and correlation" between the two vectors and then create the score based on that. Cosine similarity measures the similarity between two 
       vectors of an inner product space. It is measured by the cosine of the angle between two vectors and determines whether two vectors are pointing in roughly the same 
       direction. It is often used to measure document similarity in text analysis
     
