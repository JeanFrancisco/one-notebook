export const compareFunction = (firstElement, secondElement, order = 'asc') => {
    if( firstElement > secondElement )
        return ( order === 'asc' ? 1 : -1 );

    else if( firstElement < secondElement )
        return ( order === 'asc' ? -1 : 1 );

    else
        return 0;
}