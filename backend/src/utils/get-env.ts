export const getEnv = (key: string,defaultValues:string=""): string => {
    const value = process.env[key];
    if (!value) {
      if(defaultValues){
        return defaultValues;
      }
      throw new Error(`Environment variable ${key} not found`);
    }
    return value;
}
