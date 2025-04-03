// Initialize EmailJS
emailjs.init("VmloBz_eWNDXviRP5"); // Replace with your actual EmailJS Public Key

// Handle Contact Us Form Submission
document
  .querySelector(".contact-us form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const bookName = form.querySelector('input[id="book-name"]').value;
    const address = form.querySelector('textarea[id="address"]').value;
    const message = form.querySelector('textarea[id="message"]').value;

    // Debugging: Log form data
    console.log("Contact Form Data:", {
      email,
      phone,
      bookName,
      address,
      message,
    });

    emailjs
      .send("service_sxyun7h", "template_7yxzgcu", {
        user_email: email,
        user_phone: phone,
        user_book_name: bookName,
        user_address: address,
        user_message: message,
      })
      .then(function (response) {
        console.log("EmailJS Response:", response);

        // Send Auto-Reply Email
        emailjs
          .send("service_sxyun7h", "template_auto_reply", {
            user_email: email, // Send auto-reply to the user's email
          })
          .then(function (autoReplyResponse) {
            console.log("Auto-Reply Sent:", autoReplyResponse);
          })
          .catch(function (autoReplyError) {
            console.error("Auto-Reply Error:", autoReplyError);
          });

        displayMessage(
          ".contact-us",
          "Your message has been sent successfully!"
        );
        form.reset(); // Clear the form fields
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        displayMessage(
          ".contact-us",
          "Failed to send your message. Please try again."
        );
      });
  });

// Handle Suggest a Book Form Submission
document
  .querySelector(".suggest-book form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const suggestion = form.querySelector("textarea").value;

    // Debugging: Log form data
    console.log("Suggest a Book Form Data:", { email, suggestion });

    emailjs
      .send("service_0xryaop", "template_um1nmyn", {
        user_email: email,
        user_suggestion: suggestion,
      })
      .then(function (response) {
        console.log("EmailJS Response:", response);
        displayMessage(
          ".suggest-book",
          "Your book suggestion has been submitted successfully!"
        );
        form.reset(); // Clear the form fields
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        displayMessage(
          ".suggest-book",
          "Failed to submit your suggestion. Please try again."
        );
      });
  });

// Function to display a message in the form section
function displayMessage(selector, message) {
  const section = document.querySelector(selector);
  const msgElement = document.createElement("p");
  msgElement.textContent = message;
  msgElement.style.color = "green";
  msgElement.style.fontWeight = "bold";
  section.appendChild(msgElement);

  // Remove the message after 5 seconds
  setTimeout(() => {
    msgElement.remove();
  }, 5000);
}

function sendAutoReply(e) {
  e.preventDefault();

  emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      e.target,
      'YOUR_PUBLIC_KEY'
  ).then(
      (result) => {
          console.log('Auto-reply sent:', result.text);
      },
      (error) => {
          console.error('Error sending auto-reply:', error.text);
      }
  );
}
