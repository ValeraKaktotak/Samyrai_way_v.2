import React from "react";

type validatorsType = (value:any) => void

export const required: validatorsType = (value) => (value ? undefined : 'Required')
const maxLength = (max:number):validatorsType => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength20 = maxLength(20)

export const maxLength200 = maxLength(200)