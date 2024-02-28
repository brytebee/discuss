// TODO:
/**
 * 1. Test token expiry if token is expired, if code verifies?
 * 2. Delete token after verification
 * 3. Create forget password
 *    // Create form that receives user's email
 *    // Create a server action that
 *      // Zod it.
 *      // Checks the DB if email exists
 *         // Return if it doesn't with error message
 *      // Check if the verification code has a record for their email
 *         // Delete it if yes
 *      // Generate a new code
 *      // Send code to the email
 *      // Verify code
 *      // Redirect them to sign in
 * 4. If active isn't true, user cant use app
 *      // Turn active to true when google and github providers are used
 *      // Intercept login and ensure an error is thrown
 *          to verify emails if active isnt true
 * 5. Continue course.
 */
