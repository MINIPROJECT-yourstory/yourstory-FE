import React, { useState } from "react";
import styled from "styled-components";
import MailIcon from "../../assets/images/icon-email.svg";

const MOCK_LETTERS = [
  {
    id: 1,
    title: "안녕하세요",
    content:
      "안녕하세요. 저는 금산중학교에 재학 중인 박OO입니다. 지금까지 살아오면서 저는 한 번도 이런 마음을 느껴본 적이 없었어요. 평범한 하루를 소중하게 여기며 살아가는 할머님의 이야기를 읽으면서, 저도 당연하게 생각했던 작은 일들이 얼마나 소중한지 깨닫게 되었습니다.\n저는 매일 바쁘게 학교 생활을 하고 친구들과 지내면서 어쩌면 제 주변의 사람들과 소중한 순간들을 놓치고 있었던 것 같습니다. 할머님이 이웃과 나누는 작은 이야기 속에서 행복을 느끼는 부분이 특히 기억에 남았어요. 저도 언젠가 할머님처럼 하루를 기쁨으로 맞이하며 사는 법을 배우고 싶습니다.\n할머님, 삶을 소중히 여기고 매 순간을 즐기려는 모습이 저에게 정말 큰 가르침이 되었어요. 할머님의 자서전을 읽은 후, 저도 작은 일상 속에서 행복을 찾고 감사하는 연습을 해보려고 합니다. 소중한 이야기 들려주셔서 감사드리고, 앞으로도 건강하게 지금처럼 행복하고 평온한 하루하루를 보내시기를 진심으로 기원합니다.",
  },
  {
    id: 3,
    title: "웃음가득하시길잉아아아아아ㅏㅇ",
    content:
      "김금자 어르신께, 언제나 그 웃음과 함께 하시길  바랍니다. 지금까지 보여주신 그 웃음이 제게는 참...",
  },
  {
    id: 5,
    title: "삶을 돌아보는 요즘아아아아아아아아아아ㅏㅇ",
    content:
      "지금까지의 제 삶을 돌아볼 수 있었습니다. 언제든지 내게 주어진 것에 감사한다는 것이 무엇인지 김금자 할머님의 자서전을 통해 처음으로 깨닫게 되었습니다. 평범한 일상 속에서도 기쁨을 찾으며 하루하루를 소중히 살아가는 할머님의 모습은 저에게 깊은 울림을 주었어요. 저도 그동안 당연하게 생각했던 것들을 돌아보며, 작은 일에도 감사하는 마음을 갖고 싶어졌습니다.\n할머님이 이웃과 나누는 작은 대화 속에서 느끼셨던 행복이 특히 인상 깊었습니다. 저도 제 주변 사람들과의 소소한 순간을 더 소중히 여기고, 하루하루를 의미 있게 보내며 살아가고 싶어요. 할머님이 들려주신 삶의 이야기들이 저에게 큰 가르침이 되었고, 할머님의 소중한 이야기가 제 마음속에 오래도록 남을 것 같습니다.",
  },
  {
    id: 10,
    title: "김금자 할머니께",
    content:
      "안녕하세요. 저는 금산중학교에 재학중인 박OO입니다. 지금까지 살아오면서 저는 한 번도 이런  ...",
  },
];
const Letter = () => {
  const [letters, setLetters] = useState(MOCK_LETTERS);

  // useEffect(() => {
  //   const fetchLetters = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/letter/${book_id}`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       setLetters(response.json());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchLetters();
  // }, []);

  return (
    <div>
      {letters.length > 0 ? (
        letters.map((letter, idx) => (
          <Wrapper key={letter.id}>
            <Order>{idx + 1}</Order>
            <Icon src={MailIcon} alt="편지 아이콘" />
            <Title>{letter.title}</Title>
            <Content>{letter.content}</Content>
          </Wrapper>
        ))
      ) : (
        <BlankText>
          <Icon src={MailIcon} alt="편지 아이콘" />
          편지를 남기고 우편함을 채워주세요.
        </BlankText>
      )}
    </div>
  );
};

export default Letter;

const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.87rem;
  padding: 0.3rem 1rem;
  border-bottom: 1.3px dashed #fafc97;
  cursor: pointer;
`;

const Order = styled.div`
  width: 1rem;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;
const Icon = styled.img`
  width: 29px;
  height: 29px;
`;
const Title = styled.div`
  color: white;
  margin-left: 0.93rem;
  width: 9.87rem;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Content = styled.div`
  width: 38rem;
  color: #fafc97;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const BlankText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  color: #fafc97;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 5rem 0;
`;
