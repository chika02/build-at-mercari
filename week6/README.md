## how to run

in /ex-gen-app run

```
npm start
```
to start the web app. for testing run
```
npm test
```

## endpoints
- / (root) - shows the index. can redirect to blog page and add page.
- /login - the login page. timeout in one minute. 
username: chika, password: 1234
there is no user registration page.

- /blogs/:blogName - blog page. can redirect to edit page and can delete page.
- /add - add blog.
- /edit/:blogName - edit blog.

## about the requirements
- implemented all the operation with blogs and created endpoints.
note: delete request is handled at the editing page with the 'post' request.
- stores data in data/pages.json
- provide authentication. session ends in 1 minute. redirects to login page.
- implemented e2e test using jest.
note: not completed for some of the operations
note: All action was tested on website beforehand.
