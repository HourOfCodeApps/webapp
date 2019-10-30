import 'core-js/proposals/promise-all-settled';
import * as functions from 'firebase-functions';
import mailgun from 'mailgun-js';

import trimObject from './trimObject';

const { domain, api_key: apiKey, host } = functions.config().mailgun;
const mg = mailgun({ apiKey, domain, host });

const { from: defaultFrom, reply_to: defaultReplyTo } = functions.config().email;

const aggregateRecipients = ({ to, cc, bcc }) => {
  if (to && to.length) {
    return { to: [to], cc, bcc };
  }

  if (cc && cc.length) {
    return { to: [cc], bcc };
  }

  if (bcc) {
    return {
      to: bcc.split(',').map(v => v.trim()),
    }
  }

  return {};
}

/**
 *
 * @param {{ from, to, subject, text, html, replyTo }} options
 */
const sendEmail = async (options) => {
  console.log('sendEmail', JSON.stringify(options));
  const { from, subject, text, html, replyTo } = options;
  const { to, cc, bcc } = aggregateRecipients(options);

  const result = await Promise.allSettled(
    to.map((t) => {
      const data = trimObject({
        from: from || defaultFrom,
        to: t,
        cc,
        bcc,
        subject,
        text,
        html,
        'h:Reply-To': replyTo || defaultReplyTo,
      });
      console.log(JSON.stringify(data));

      return mg.messages().send(data);
    }),
  );

  console.log('Email sending result', JSON.stringify(result));
}

export default sendEmail;
