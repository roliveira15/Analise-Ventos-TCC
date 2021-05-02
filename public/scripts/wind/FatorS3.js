
export function FatorS3(group) {

    let fatorS3;

    switch (group){
        case 0:
            fatorS3 = 1.10;
            break;

        case 1:
            fatorS3 = 1.00;
            break;

        case 2:
            fatorS3 = 0.95;
            break;

        case 3:
            fatorS3 = 0.88;
            break;

        default:
            fatorS3 = 0.83;
    }
    return fatorS3

};

