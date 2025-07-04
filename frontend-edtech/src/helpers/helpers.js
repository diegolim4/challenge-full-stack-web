
export const handleError = (error) => {
    let message = '';

    if (error.response) {
        if (error.response.status)
            message += ` ERROR RESPONSE STATUS: ${error.response.status} - STATUS TEXT: ${error.response.statusText}`;
        if (error.response && error.response.data)
            message +=
                ' ERROR RESPONSE DATA ' + JSON.stringify(error.response.data);
    } else if (error.code) message += error.code;
    else if (error.message) message += ' ERROR MESSAGE: ' + error.message;
    else
        message +=
            ' ERROR The request was made but no response was received and no messages';

    return message;
}

export const formatCPF = cpf => {
    cpf = cpf.replace(/[^\d]/g, '')
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatCNPJ = cnpj => {
    cnpj = cnpj.replace(/[^\d]/g, '')
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export const formatBrlCoin = async (value) => {
    if (!value) return
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 6,
    }).format(Number(value));
}

export const formatName = (text) => {
    if (!text) return;
    return text
        .toLowerCase()
        .replace(/\b(da|de|do|dos)\b|\b\w+/g, (match, group1) => {
            if (group1)
                return group1.toLowerCase();
            else
                return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
        });
}

import moment from 'moment';
export const formatDateTime = (date) => {
    return moment(date)
        .utcOffset('-0300')
        .locale('pt-br')
        .format('DD/MM/YYYY HH:mm')
}

export const validateCPF = (value) => {
    var cpf = value.trim()

    cpf = cpf.replace(/\./g, '')
    cpf = cpf.replace('-', '')
    cpf = cpf.split('')

    var v1 = 0
    var v2 = 0
    var aux = false

    for (let i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
            aux = true
        }
    }

    if (aux == false) {
        return false
    }

    for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
        v1 += cpf[i] * p
    }

    v1 = (v1 * 10) % 11

    if (v1 == 10) {
        v1 = 0
    }

    if (v1 != cpf[9]) {
        return false
    }

    for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
        v2 += cpf[i] * p
    }

    v2 = (v2 * 10) % 11

    if (v2 == 10) {
        v2 = 0
    }

    if (v2 != cpf[10]) {
        return false
    }

    return true
}

export const validateEmail = (email) => {
    let validFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validFormat.test(email)
}

export const removeSpecialChars = (doc) => {
    return doc.trim().replace(/[^\d]+/g, '')
}