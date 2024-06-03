import nodemailer from 'nodemailer';
import { Headers } from '@/constants';

const res = await fetch(`${import.meta.env.API_ENDPOINT}/v1/settings`, {
    headers: Headers
});

const { data } = await res?.json();
const settings = data.settings;


// Create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: settings?.smtpHost || process.env.MAIL_HOST,
    port: settings?.smtpPort || process.env.MAIL_PORT || 587,
    secure: settings?.smtpPort === '465' ? true : false, // true for 465, false for other ports
    auth: {
        user: settings?.smtpUser || process.env.MAIL_USERNAME,
        pass: settings?.smtpPassword || process.env.MAIL_PASSWORD,
    },
});

export {
    transporter
}