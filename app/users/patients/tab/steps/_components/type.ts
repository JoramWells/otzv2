import { z } from 'zod'

export const NewbornSchema = z
  .object({
    temperature: z.preprocess(
      (value) => {
        const parsedVal = parseFloat(String(value))
        if (isNaN(parsedVal)) {
          return undefined
        }
        return parsedVal
      },
      z
        .number()
        .min(36.5, { message: 'Abnormal body temperature' })
        .max(37.5, { message: 'Temperature is high' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),
    pulseRate: z.preprocess(
      (value) => {
        const parsedVal = parseFloat(String(value))
        if (isNaN(parsedVal)) {
          return undefined
        }
        return parsedVal
      },
      z
        .number()
        .min(100, { message: 'Pulse rate must be at least 40 bpm' })
        .max(160, { message: 'Pulse rate must be at least 180 bpm' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),

    diastolic: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(90, { message: 'Diastolic pressure must be at least 90 mmHg' })
        .max(200, { message: 'Diastolic pressure must be at most 200 mmHg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),

    systolic: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(60, { message: 'Systolic Pressure must be at least 60 mmHg' })
        .max(120, { message: 'Systolic pressure must be at most 120 mmHg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid systolic value'
        })
    ),

    respiratoryRate: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(30, {
          message: 'Respiratory rate must be at least 12 breaths per minute'
        })
        .max(60, {
          message: 'Respiratory rate must be at most 25 breaths per minute'
        })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid respiratory rate value'
        })
    ),

    oxygenSAturation: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(85, { message: 'Oxygen saturation must be at least 85%' })
        .max(100, { message: 'Oxygen saturation must be at most 100%' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid oxygen value'
        })
    ),

    height: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(50, { message: 'Height must be at least 50 cm' })
        .max(55, { message: 'Height must be at most 250 cm' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid height value'
        })
    ),

    weight: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(2.5, { message: 'Weight must be at least 3 kg' })
        .max(4, { message: 'Weight must be at most 300kg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid weight value'
        })
    )
    // MUAC: z.string(),
    // LMP: z.string()
  })
  .refine((data) => data.systolic > data.diastolic, {
    message: 'Systolic pressure must be greater tan diastolic pressure',
    path: ['systolic']
  })

//

export const InfantSchema = z
  .object({
    temperature: z.preprocess(
      (value) => {
        const parsedVal = parseFloat(String(value))
        if (isNaN(parsedVal)) {
          return undefined
        }
        return parsedVal
      },
      z
        .number()
        .min(36.5, { message: 'Abnormal body temperature' })
        .max(37.5, { message: 'Temperature is high' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),
    pulseRate: z.preprocess(
      (value) => {
        const parsedVal = parseFloat(String(value))
        if (isNaN(parsedVal)) {
          return undefined
        }
        return parsedVal
      },
      z
        .number()
        .min(90, { message: 'Pulse rate must be at least 90 bpm' })
        .max(160, { message: 'Pulse rate must be at least 160 bpm' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),

    diastolic: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(90, { message: 'Diastolic pressure must be at least 90 mmHg' })
        .max(200, { message: 'Diastolic pressure must be at most 200 mmHg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),

    systolic: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(60, { message: 'Systolic Pressure must be at least 60 mmHg' })
        .max(120, { message: 'Systolic pressure must be at most 120 mmHg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid systolic value'
        })
    ),

    respiratoryRate: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(30, {
          message: 'Respiratory rate must be at least 30 breaths per minute'
        })
        .max(60, {
          message: 'Respiratory rate must be at most 60 breaths per minute'
        })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid respiratory rate value'
        })
    ),

    oxygenSAturation: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(85, { message: 'Oxygen saturation must be at least 85%' })
        .max(100, { message: 'Oxygen saturation must be at most 100%' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid oxygen value'
        })
    ),

    height: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(50, { message: 'Height must be at least 50 cm' })
        .max(75, { message: 'Height must be at most 75 cm' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid height value'
        })
    ),

    weight: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(9, { message: 'Weight must be at least 9 kg' })
        .max(11, { message: 'Weight must be at most 11 kg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid weight value'
        })
    )
    // MUAC: z.string(),
    // LMP: z.string()
  })
  .refine((data) => data.systolic > data.diastolic, {
    message: 'Systolic pressure must be greater tan diastolic pressure',
    path: ['systolic']
  })

//

export const AdultSchema = z
  .object({
    temperature: z.preprocess(
      (value) => {
        const parsedVal = parseFloat(String(value))
        if (isNaN(parsedVal)) {
          return undefined
        }
        return parsedVal
      },
      z
        .number()
        .min(-10, { message: 'Abnormal body temperature' })
        .max(40, { message: 'Temperature is high' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),
    pulseRate: z.preprocess(
      (value) => {
        const parsedVal = parseFloat(String(value))
        if (isNaN(parsedVal)) {
          return undefined
        }
        return parsedVal
      },
      z
        .number()
        .min(40, { message: 'Pulse rate must be at least 40 bpm' })
        .max(180, { message: 'Pulse rate must be at least 180 bpm' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),

    diastolic: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(90, { message: 'Diastolic pressure must be at least 90 mmHg' })
        .max(200, { message: 'Diastolic pressure must be at most 200 mmHg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid body temperature'
        })
    ),

    systolic: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(60, { message: 'Systolic Pressure must be at least 60 mmHg' })
        .max(120, { message: 'Systolic pressure must be at most 120 mmHg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid systolic value'
        })
    ),

    respiratoryRate: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(12, {
          message: 'Respiratory rate must be at least 12 breaths per minute'
        })
        .max(25, {
          message: 'Respiratory rate must be at most 25 breaths per minute'
        })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid respiratory rate value'
        })
    ),

    oxygenSAturation: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(85, { message: 'Oxygen saturation must be at least 85%' })
        .max(100, { message: 'Oxygen saturation must be at most 100%' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid oxygen value'
        })
    ),

    height: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(50, { message: 'Height must be at least 50 cm' })
        .max(250, { message: 'Height must be at most 250 cm' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid height value'
        })
    ),

    weight: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .min(3, { message: 'Weight must be at least 3 kg' })
        .max(300, { message: 'Weight must be at most 300kg' })
        .refine((val) => Number.isFinite(val), {
          message: 'Invalid weight value'
        })
    )
    // MUAC: z.string(),
    // LMP: z.string()
  })
  .refine((data) => data.systolic > data.diastolic, {
    message: 'Systolic pressure must be greater tan diastolic pressure',
    path: ['systolic']
  })

//
