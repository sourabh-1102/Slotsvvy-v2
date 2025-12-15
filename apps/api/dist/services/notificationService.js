"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.sendEmail = void 0;
const sendEmail = (to, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    // Stub for SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'replace_me') {
        // console.log(`[SendGrid] Sending email to ${to}: ${subject}`);
    }
    else {
        console.log(`[Console-Mode] EMAIL to ${to} | Subject: ${subject} | Body: ${body}`);
    }
});
exports.sendEmail = sendEmail;
const sendSMS = (to, body) => __awaiter(void 0, void 0, void 0, function* () {
    // Stub for Twilio
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID !== 'replace_me') {
        // console.log(`[Twilio] Sending SMS to ${to}: ${body}`);
    }
    else {
        console.log(`[Console-Mode] SMS to ${to}: ${body}`);
    }
});
exports.sendSMS = sendSMS;
