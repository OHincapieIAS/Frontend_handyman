export interface CalculatorHoursResponse {
    idService: bigint;
    idTechnician: bigint;
    startDate: Date;
    finalDate: Date;
    regularHours: number;
    nightHour: number;
    sundayHour: number;
    regularHourExtra: number;
    nightHourExtra: number;
    sundayHourExtra: number;
    totalHoursByService: number;
    totalHours: number;
}