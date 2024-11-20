const BookHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.padding.md};
    margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const ImageAndTitleWrapper = styled.div`
    display: flex;
    flex: 1;
    height: 158px;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
`;

const BookImage = styled.img`
    width: 400px;
    height: 158px;
    object-fit: cover;
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.padding.md};
    color: ${({ theme }) => theme.colors.text.white};
    flex: 1;
`;

const EbookButton = styled.button`
    width: 166px;
    height: 158px;
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.text.white};
    padding: ${({ theme }) => theme.spacing.padding.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    text-align: center;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
`; 