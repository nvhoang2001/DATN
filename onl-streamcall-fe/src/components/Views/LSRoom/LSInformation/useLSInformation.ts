import { useAppSelector } from "@/hooks"

export const useLSInformation = () => {
  const streamer = useAppSelector(state => state.livestream.livestreamDetail.creator);
  return {
    streamer,
  }
}