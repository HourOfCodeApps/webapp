import * as functions from 'firebase-functions';
import mailgun from 'mailgun-js';

const { domain, api_key: apiKey } = functions.config().mailgun;
const mg = mailgun({ apiKey, domain });

const { from: defaultFrom, reply_to: defaultReplyTo } = functions.config().email;

/**
 *
 * @param {{ from, to, subject, text, html, replyTo }} options
 */
const sendEmail = async ({ from, to, subject, text, html, replyTo }) => {
  const data = {
    from: from || defaultFrom,
    to,
    subject,
    text,
    html,
    'h:Reply-To': replyTo || defaultReplyTo,
  };

  const result = await mg.messages().send(data);

  console.log('Email sending result', result);
}

export default sendEmail;
