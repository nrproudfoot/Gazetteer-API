export const formatCountryName = (country: string): string => {
    let formattedCountry: string;
    switch (country) {
        case 'congo-brazzaville':
            formattedCountry = 'Congo%20Republic';
            break;
        case 'congo-kinshasa':
            formattedCountry = 'Democratic%20Republic%20of%20the%20Congo';
            break;
        case 'falkland-islands-malvinas':
            formattedCountry = 'Falkland%20Islands';
            break;
        case 'guinea-bissau':
            formattedCountry = country;
            break;
        case 'korea-south':
            formattedCountry = 'South%20Korea';
            break;
        case 'lao-pdr':
            formattedCountry = 'Laos';
            break;
        default:
            formattedCountry = country.split('-').join('%20');
            break;
    }
    return formattedCountry;
}