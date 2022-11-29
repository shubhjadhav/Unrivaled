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
     * In this version, we are working with pdf file formats and the user is able to upload one resume for one score output
     * In future versions, we will add docx file and also the user will be able to upload multiple resumes to compare with the job descreption and choose the one that matches 
       the most
       
  3. Job Description Upload
  4. Store data in Database
  5. Access, process, and store results in Database
  6. Display results

 ### How It Works
  1. Create a dictionary of both jd and resume and then create vectors of both resume and jd
  2. Finding keywords in both jd and resume after removing stop words and unnecessary things
  3. Finding similarities between the two vectors
  4. Create score based on the similarity
