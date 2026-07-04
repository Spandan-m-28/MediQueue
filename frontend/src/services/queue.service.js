import axiosInstance from "../api/axios";

const getQueue = async (queueId) => {
  try {
    const { data } = await axiosInstance.get(`/queue/${queueId}`);
    return data; // { success, message, queue }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch queue.");
  }
};

const getDepartmentByQueue = async (departmentId) => {
  try {
    const { data } = await axiosInstance.get(
      `/department/details/${departmentId}`,
    );
    return data; // { success, department }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch department",
    );
  }
};

const joinQueue = async (queueId) => {
  try {
    const { data } = await axiosInstance.post(`/token/${queueId}/join`);
    return data; // { success, message, tokenNumber, estimatedWaitTime }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to join queue");
  }
};

const getMyTokens = async () => {
  try {
    const { data } = await axiosInstance.get(`/token/my`);
    return data; // { success, message, token: [...] }
  } catch (error) {
    throw new Error(error.message?.data?.message || "Failed to get token");
  }
};

const updateQueueStatus = async (queueId, queueStatus) => {
  try {
    const { data } = await axiosInstance.patch(`/queue/${queueId}/status`, {
      queueStatus,
    });
    return data;
  } catch (errro) {
    throw new Error(
      error.message?.data?.message || "Failed to update queue status",
    );
  }
};

const callNextToken = async (queueId) => {
  try {
    const { data } = await axiosInstance.post(`/queue/${queueId}/next`);
    return data;
  } catch {
    throw new Error(
      error.message?.data?.message || "Failed to call next token",
    );
  }
};

const completeCurrentToken = async (queueId) => {
  try {
    const { data } = await axiosInstance.post(`/queue/${queueId}/complete`);
    return data;
  } catch (error) {
    throw new Error(
      error.message?.data?.message || "Failed to complete current token",
    );
  }
};

const missCurrentToken = async (queueId) => {
  try {
    const { data } = await axiosInstance.post(`/queue/${queueId}/miss`);
    return data;
  } catch (error) {
    throw new Error(
      error.message?.data?.message || "Failed to mark token missed",
    );
  }
};

const leaveQueue = async (queueId) => {
  try {
    const response = await axiosInstance.patch(`/token/${queueId}/leave`);
    return response;
  } catch (error) {
    throw new Error(error.message?.data?.message || "Failed to leave queue");
  }
};

const queueService = {
  getQueue,
  getDepartmentByQueue,
  joinQueue,
  getMyTokens,
  updateQueueStatus,
  callNextToken,
  completeCurrentToken,
  missCurrentToken,
  leaveQueue,
};

export default queueService;
